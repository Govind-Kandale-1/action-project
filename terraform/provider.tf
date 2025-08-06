provider "aws" {

}


terraform {
  backend "s3" {
    bucket         = "terraform-resources-github"
    region         = "ap-south-1"
    key            = "github-action/terraform.tfstate"
    encrypt        = true
    dynamodb_table = "aws-github-tf-action-project"
  }
}
