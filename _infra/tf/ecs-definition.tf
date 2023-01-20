# resource "aws_ecs_task_definition" "my_first_task" {
#   family = "my-first-task" # Naming our first task
#   container_definitions = jsonencode([{
#     name : var.docker_name
#     image : "${var.ecr_account}.dkr.ecr.${var.region}.amazonaws.com/${var.docker_name}:latest"
#     essential : true
#     portMappings : [{
#       hostPort : var.container_port
#       containerPort : var.container_port
#       protocol : "tcp"
#     }]
#     memory : var.docker_memory
#     cpu : var.docker_cpu
#     environment : [
#       for k, v in var.container_environment_variables : { name : k, value : v }
#     ]
#     secrets : [
#       for k, v in var.container_secret_environment_variables : { name : k, valueFrom : v }
#     ]
#   }])
#   requires_compatibilities = ["FARGATE"]       # Stating that we are using ECS Fargate
#   network_mode             = "awsvpc"          # Using awsvpc as our network mode as this is required for Fargate
#   memory                   = var.docker_memory # Specifying the memory our container requires
#   cpu                      = var.docker_cpu    # Specifying the CPU our container requires
#   execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
# }

# resource "aws_iam_role" "ecsTaskExecutionRole" {
#   name               = "ecsTaskExecutionRole"
#   assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
# }

# data "aws_iam_policy_document" "assume_role_policy" {
#   statement {
#     actions = ["sts:AssumeRole"]

#     principals {
#       type        = "Service"
#       identifiers = ["ecs-tasks.amazonaws.com"]
#     }
#   }
# }

# resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
#   role       = aws_iam_role.ecsTaskExecutionRole.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
# }
