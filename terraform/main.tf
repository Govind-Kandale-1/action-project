resource "aws_s3_bucket" "static_site" {
  bucket = var.tf_bucket
}


resource "aws_s3_bucket_website_configuration" "hosting_static_website" {
  bucket = aws_s3_bucket.static_site.id

  index_document {
    suffix = "website.html"
  }
}

resource "aws_s3_bucket_public_access_block" "public_access_for_static_site" {
  bucket                  = aws_s3_bucket.static_site.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

}


resource "aws_s3_bucket_policy" "static_site_policy" {
  bucket = aws_s3_bucket.static_site.id
  policy = jsondecode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = " ${aws_s3_bucket.static_site}/* "
      }
    ]
  })
  depends_on = [ aws_s3_bucket_public_access_block.public_access_for_static_site ]
}



