resource "aws_ecs_service" "scion-npc-gen-client" {
  name                               = "${var.name}-service-${var.environment}"
  cluster                            = var.ecs_cluster_id
  task_definition                    = aws_ecs_task_definition.scion-npc-gen.arn
  desired_count                      = 1
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  launch_type                        = "FARGATE"
  scheduling_strategy                = "REPLICA"

  network_configuration {
    security_groups  = [aws_security_group.ecs_tasks.id]
    subnets          = var.subnets.*.id
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.scion-npc-gen.arn
    container_name   = "${var.name}-container-${var.environment}"
    container_port   = var.container_port
  }

  lifecycle {
    create_before_destroy = true
    # ignore_changes = [task_definition, desired_count]
  }

  depends_on = [
    aws_alb_target_group.scion-npc-gen,
    aws_lb_listener_rule.client
  ]
}

resource "aws_security_group" "ecs_tasks" {
  name        = "${var.stack_name}-${var.docker_name}-alb-ingress-sg"
  description = "The SG to control all ingress access to the ELB"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = var.container_port
    to_port     = var.container_port
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.name}-${var.docker_name}-alb-ingress-sg"
  }
}

resource "aws_alb_target_group" "scion-npc-gen" {
  name        = "${var.name}-tg-${var.environment}"
  port        = 80
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
    Name        = "${var.name}-tg-${var.environment}"
    Environment = var.environment
  }
}
  
resource "aws_lb_listener_rule" "client" {
  load_balancer_arn = aws_alb_target_group

  action {
    target_group_arn = aws_alb_target_group.scion-npc-gen.arn
    type             = "forward"
  }

  condition {
    path_pattern {
      values = [var.path_pattern]
    }
  }

  depends_on = [aws_alb_target_group.scion-npc-gen]
}
