module "be-flask" {
  source = "./tf_ecs_flask"

  // Service Variables
  container_environment = [
    { name = "LOG_LEVEL",
    value = "DEBUG" },
    { name = "PORT",
    value = 5000 }
  ]

  container_secret_environment_variables = {
    CONFIG_TYPE : "${data.aws_secretsmanager_secret.scion.arn}:CONFIG_TYPE::"
    REGION_NAME : "${data.aws_secretsmanager_secret.scion.arn}:REGION_NAME::"
    FLASK_APP : "${data.aws_secretsmanager_secret.scion.arn}:FLASK_APP::"
  }

  cidr                           = module.vpc.vpc_cidr
  container_image                = jsondecode(data.aws_secretsmanager_secret_version.current.secret_string)["FLASK_IMAGE"]
  ecs_cluster_id                 = module.ecs.ecs_cluster_id
  ecs_sg_id                      = module.ecs.ecs_sg_id
  environment                    = var.environment
  health_check_path              = var.health_check_path
  private_subnets                = module.vpc.private_subnets
  region                         = var.region
  scion_npc_gen_alb_arn          = module.alb.scion_npc_gen_alb_arn
  service_discovery_namespace_id = module.ecs.service_discovery_namespace_id
  vpc_id                         = module.vpc.vpc_id
}
