resource "aws_security_group" "ecs" {
  name        = var.name
  description = "Container Allowed Ports"
  vpc_id      = var.vpc_id

  tags = {
    Name = "${var.name}-sg-ecs-${var.environment}"
  }

  lifecycle {
    create_before_destroy = true
  }
}
