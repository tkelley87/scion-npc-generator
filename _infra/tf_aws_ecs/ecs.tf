resource "aws_ecs_cluster" "scion-npc-gen" {
  name = "${var.name}-cluster-${var.environment}"
}
