module "alb" {
  source            = "./tf_aws_alb"
  ecs_sg_id         = module.ecs.ecs_sg_id
  name              = var.name
  vpc_id            = module.vpc.vpc_id
  subnets           = module.vpc.public_subnets
  environment       = var.environment
  health_check_path = var.health_check_path
  # alb_tls_cert_arn  = var.tsl_certificate_arn
}
