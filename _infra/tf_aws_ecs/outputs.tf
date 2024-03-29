output "ecs_cluster_name" {
  value = aws_ecs_cluster.scion-npc-gen.name
}

output "ecs_cluster_id" {
  value = aws_ecs_cluster.scion-npc-gen.id
}

output "ecs_sg_id" {
  value = aws_security_group.ecs.id
}

output "service_discovery_namespace_id" {
  value = aws_service_discovery_private_dns_namespace.service.id
}
