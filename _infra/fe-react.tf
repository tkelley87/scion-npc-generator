module "fe-react" {
  source = "./tf_ecs_react"

  // Service Variables
  container_environment = [
    { name = "LOG_LEVEL",
    value = "DEBUG" },
    { name = "PORT",
    value = 80 }
  ]

  alb_scion_cert_arn               = jsondecode(data.aws_secretsmanager_secret_version.current.secret_string)["AWS_ACM_CERT"]
  cidr                             = module.vpc.vpc_cidr
  container_image                  = jsondecode(data.aws_secretsmanager_secret_version.current.secret_string)["REACT_IMAGE"]
  dns_name                         = jsondecode(data.aws_secretsmanager_secret_version.current.secret_string)["DNS_NAME"]
  ecs_cluster_id                   = module.ecs.ecs_cluster_id
  ecs_sg_id                        = module.ecs.ecs_sg_id
  environment                      = var.environment
  health_check_path                = var.health_check_path
  hosted_zone_id                   = jsondecode(data.aws_secretsmanager_secret_version.current.secret_string)["HOSTED_ZONE_ID"]
  private_subnets                  = module.vpc.private_subnets
  region                           = var.region
  scion_npc_gen_alb_arn            = module.alb.scion_npc_gen_alb_arn
  scion_npc_gen_alb_dns_name       = module.alb.scion_npc_gen_alb_dns_name
  scion_npc_gen_alb_hosted_zone_id = module.alb.scion_npc_gen_alb_hosted_zone_id
  service_discovery_namespace_id   = module.ecs.service_discovery_namespace_id
  vpc_id                           = module.vpc.vpc_id
}
