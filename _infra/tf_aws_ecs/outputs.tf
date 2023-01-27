output "ecs_cluster_name" {
  value = aws_ecs_cluster.scion-npc-gen.name
}

output "ecs_sg_id" {
  value = aws_security_group.ecs.id
}
