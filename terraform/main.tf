resource "aws_s3_bucket" "static_site" {
  bucket = var.tf_bucket
}