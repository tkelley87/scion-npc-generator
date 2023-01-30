resource "aws_lb" "scion-npc-gen" {
  name               = "${var.name}-alb-${var.environment}"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.ecs_sg_id]
  subnets            = var.subnets.*.id

  enable_deletion_protection = false

  tags = {
    Name        = "${var.name}-alb-${var.environment}"
    Environment = var.environment
  }

  provisioner "local-exec" {
    command = "sleep 10"
  }
}

resource "aws_alb_listener" "http" {
  load_balancer_arn = aws_lb.scion-npc-gen.id
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = var.scion_npc_gen_tg
    type             = "forward"
  }

  depends_on = [var.scion_npc_gen_tg]
}

# This listener need SSL to be un-commented out
# resource "aws_alb_listener" "https" {
#   load_balancer_arn = aws_lb.scion-npc-gen.id
#   port              = 443
#   protocol          = "HTTPS"

#   ssl_policy      = "ELBSecurityPolicy-2016-08"
#   certificate_arn = var.alb_tls_cert_arn

#   default_action {
#     target_group_arn = aws_alb_target_group.scion-npc-gen.id
#     type             = "forward"
#   }
# }
