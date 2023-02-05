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

resource "aws_security_group_rule" "world" {
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ecs.id
  depends_on        = [aws_security_group.ecs]
}

resource "aws_security_group_rule" "world-https" {
  type              = "ingress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  ipv6_cidr_blocks  = ["::/0"]
  security_group_id = aws_security_group.ecs.id
  depends_on        = [aws_security_group.ecs]
}

resource "aws_security_group_rule" "tcp-http" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["10.0.0.0/16"]
  security_group_id = aws_security_group.ecs.id
  depends_on        = [aws_security_group.ecs]
}

resource "aws_security_group_rule" "egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.ecs.id
  depends_on        = [aws_security_group.ecs]
}
