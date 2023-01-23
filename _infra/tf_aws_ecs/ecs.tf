resource "aws_ecs_cluster" "scion-npc-gen" {
  name = "${var.name}-cluster-${var.environment}"
}

resource "aws_ecs_task_definition" "scion-npc-gen" {
  family                   = "${var.name}-task-${var.environment}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn
  container_definitions = jsonencode([{
    name        = "${var.name}-container-${var.environment}"
    image       = "${var.container_image}:latest"
    essential   = true
    environment = var.container_environment
    portMappings = [{
      protocol      = "tcp"
      containerPort = var.container_port
      hostPort      = var.container_port
    }]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = aws_cloudwatch_log_group.main.name
        awslogs-stream-prefix = "ecs"
        awslogs-region        = var.region
      }
    }
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

resource "aws_ecs_service" "scion-npc-gen-client" {
 name                               = "${var.name}-service-${var.environment}"
 cluster                            = aws_ecs_cluster.scion-npc-gen.id
 task_definition                    = aws_ecs_task_definition.scion-npc-gen.arn
 desired_count                      = 1
 deployment_minimum_healthy_percent = 50
 deployment_maximum_percent         = 200
 launch_type                        = "FARGATE"
 scheduling_strategy                = "REPLICA"

 network_configuration {
   security_groups  = var.ecs_service_security_groups
   subnets          = var.subnets.*.id
   assign_public_ip = false
 }

 load_balancer {
   target_group_arn = var.aws_alb_target_group_arn
   container_name   = "${var.name}-container-${var.environment}"
   container_port   = var.container_port
 }

 lifecycle {
   ignore_changes = [task_definition, desired_count]
 }
}

resource "aws_iam_role" "ecs_task_role" {
  name = "${var.name}-ecsTaskRole"

  assume_role_policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "ecs-tasks.amazonaws.com"
        },
        "Effect": "Allow",
        "Sid": ""
      }
    ]
  }
  EOF
}

resource "aws_iam_policy" "dynamodb" {
  name        = "${var.name}-task-policy-dynamodb"
  description = "Policy that allows access to DynamoDB"

 policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:CreateTable",
                "dynamodb:UpdateTimeToLive",
                "dynamodb:PutItem",
                "dynamodb:DescribeTable",
                "dynamodb:ListTables",
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:Scan",
                "dynamodb:Query",
                "dynamodb:UpdateItem",
                "dynamodb:UpdateTable"
            ],
            "Resource": "*"
        }
    ]
  }
  EOF
}

resource "aws_iam_role_policy_attachment" "ecs-task-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_role.name
  policy_arn = aws_iam_policy.dynamodb.arn
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.name}-ecsTaskExecutionRole"

  assume_role_policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "ecs-tasks.amazonaws.com"
        },
        "Effect": "Allow",
        "Sid": ""
      }
    ]
  }
  EOF
}

resource "aws_iam_role_policy_attachment" "ecs-task-execution-role-policy-attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}