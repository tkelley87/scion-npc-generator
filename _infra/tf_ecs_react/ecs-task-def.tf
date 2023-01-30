resource "aws_ecs_task_definition" "scion-npc-gen" {
  family                   = "${var.name}-task-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([{
    name : "${var.name}-container-${var.environment}"
    image : "${var.container_image}:latest"
    essential : true
    environment : "${var.environment}"
    portMappings : [{
      protocol : "tcp"
      containerPort : var.container_port
    }]
    networkMode : "awsvpc"
    # logConfiguration = {
    #   logDriver = "awslogs"
    #   options = {
    #     awslogs-group         = aws_cloudwatch_log_group.main.name
    #     awslogs-stream-prefix = "ecs"
    #     awslogs-region        = var.region
    #   }
    # }
    # environment : [
    #   for k, v in var.container_environment_variables : { name : k, value : v }
    # ]
    # secrets : [
    #   for k, v in var.container_secret_environment_variables : { name : k, valueFrom : v }
    # ]
  }])

  tags = {
    Name        = "${var.name}-task-${var.environment}"
    Environment = var.environment
  }
}
