resource "aws_ecs_service" "scion-npc-gen-client" {
  name                               = "${var.service_name}-service-${var.environment}"
  cluster                            = var.ecs_cluster_id
  task_definition                    = aws_ecs_task_definition.scion-npc-gen.arn
  desired_count                      = 1
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  enable_execute_command             = true
  health_check_grace_period_seconds  = 30
  launch_type                        = "FARGATE"
  scheduling_strategy                = "REPLICA"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = var.private_subnets.*.id
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.scion-npc-gen.arn
    container_name   = "${var.service_name}-container-${var.environment}"
    container_port   = var.container_port
  }

  lifecycle {
    create_before_destroy = true
    ignore_changes        = [task_definition, desired_count]
  }

  service_registries {
    registry_arn = aws_service_discovery_service.service.arn
  }

  depends_on = [aws_alb_target_group.scion-npc-gen]
}

resource "aws_service_discovery_service" "service" {
  name          = var.service_name
  force_destroy = true
  dns_config {
    namespace_id   = var.service_discovery_namespace_id
    routing_policy = "MULTIVALUE"
    dns_records {
      ttl  = 10
      type = "A"
    }
  }

  health_check_custom_config {
    failure_threshold = 5
  }

}

resource "aws_security_group" "ecs_tasks" {
  name   = "${var.service_name}-sg-task-${var.environment}"
  vpc_id = var.vpc_id

  ingress {
    protocol         = "tcp"
    from_port        = var.container_port
    to_port          = var.container_port
    cidr_blocks      = ["10.0.0.0/8"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    protocol         = "-1"
    from_port        = 0
    to_port          = 0
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name        = "${var.service_name}-sg-task-${var.environment}"
    Environment = var.environment
  }
}

resource "aws_security_group_rule" "sg_rule" {
  type                     = "ingress"
  from_port                = var.container_port
  to_port                  = var.container_port
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.ecs_tasks.id
  security_group_id        = var.ecs_sg_id
}

resource "aws_alb_target_group" "scion-npc-gen" {
  name        = "${var.service_name}-tg-${var.environment}"
  port        = "80"
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }

  tags = {
    Name        = "${var.service_name}-tg-${var.environment}"
    Environment = var.environment
  }
}

resource "aws_alb_listener" "ssl_listener" {
  load_balancer_arn = var.scion_npc_gen_alb_arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = var.alb_scion_cert_arn

  default_action {
    target_group_arn = aws_alb_target_group.scion-npc-gen.arn
    type             = "forward"
  }

  provisioner "local-exec" {
    command = "sleep 10"
  }

  depends_on = [aws_alb_target_group.scion-npc-gen]
}

resource "aws_alb_listener" "alb_redirect" {
  load_balancer_arn = var.scion_npc_gen_alb_arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_route53_record" "name" {
  zone_id = var.hosted_zone_id
  #TODO un-hardcode record name
  name    = "scion-npc-gen.tkelley.tv"
  type    = "C"

  alias {
    name                   = var.scion_npc_gen_alb_dns_name
    zone_id                = var.scion_npc_gen_alb_hosted_zone_id
    evaluate_target_health = true
  }
}
