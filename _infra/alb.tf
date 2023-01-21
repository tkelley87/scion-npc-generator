module "alb" {
  source      = "./tf_aws_alb"
  name        = var.name
  vpc_id      = module.vpc.id
  subnets     = module.vpc.public_subnets
  environment = var.environment
  # alb_security_groups = [module.security_groups.alb]
  # alb_tls_cert_arn    = var.tsl_certificate_arn
  health_check_path = var.health_check_path
}
