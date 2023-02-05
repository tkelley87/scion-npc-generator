output "scion_npc_gen_alb_arn" {
  value = aws_lb.scion-npc-gen.arn
}

output "scion_npc_gen_alb_dns_name" {
  value = aws_lb.scion-npc-gen.dns_name
}

output "scion_npc_gen_alb_hosted_zone_id" {
  value = aws_lb.scion-npc-gen.zone_id
}
