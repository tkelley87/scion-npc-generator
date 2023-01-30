module "alb" {
  source            = "./tf_aws_alb"
  name              = var.name
  ecs_sg_id         = module.ecs.ecs_sg_id
  vpc_id            = module.vpc.vpc_id
  subnets           = module.vpc.public_subnets
  environment       = var.environment
  health_check_path = var.health_check_path
  scion_npc_gen_tg  = var.scion_npc_gen_tg
  # alb_tls_cert_arn  = var.tsl_certificate_arn
}
