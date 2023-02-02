resource "aws_ecs_service" "scion-npc-gen-api" {
  name                               = "${var.service_name}-service-${var.environment}"
  cluster                            = var.ecs_cluster_id
  task_definition                    = aws_ecs_task_definition.scion-npc-gen.arn
  desired_count                      = 1
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  enable_execute_command             = true
  launch_type                        = "FARGATE"
  scheduling_strategy                = "REPLICA"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = var.private_subnets.*.id
    assign_public_ip = false
  }

  lifecycle {
    create_before_destroy = true
    ignore_changes        = [desired_count]
  }

  service_registries {
    registry_arn = aws_service_discovery_service.service.arn
  }
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
  port        = 5000
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

# resource "aws_alb_listener" "scion_npc_gen_client" {
#   load_balancer_arn = var.scion_npc_gen_alb_arn
#   port              = var.container_port
#   protocol          = "HTTP"

#   default_action {
#     target_group_arn = aws_alb_target_group.scion-npc-gen.arn
#     type             = "forward"
#   }

#   depends_on = [aws_alb_target_group.scion-npc-gen]
# }
