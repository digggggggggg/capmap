variable "GCP_PROJECT_ID" { type = string }
variable "GCP_REGION" { type = string }
variable "DB_USER" { type = string }
variable "DB_PASSWORD" { type = string }
variable "DB_NAME" { type = string }
variable "GCP_CREDENTIALS" {
  type        = string
  sensitive   = true
  description = "Google Cloud service account credentials"
}

# Provider configuration
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}
provider "google" {
  credentials = var.GCP_CREDENTIALS
  project     = var.GCP_PROJECT_ID
  region      = var.GCP_REGION
}

# Cloud SQL (PostgreSQL) Instance
resource "google_sql_database_instance" "main" {
  name             = "db"
  database_version = "POSTGRES_14"
  settings {
    tier = "db-f1-micro"
  }
}
resource "google_sql_database" "main" {
  name     = var.DB_NAME
  instance = google_sql_database_instance.main.name
  charset  = "utf8"
}
resource "google_sql_user" "main" {
  name     = var.DB_USER
  instance = google_sql_database_instance.main.name
  password = var.DB_PASSWORD
}

# Cloud Run Services (Backend & Frontend)

# Backend Service
resource "google_cloud_run_service" "backend" {
  name                       = "backend"
  autogenerate_revision_name = true
  location                   = var.GCP_REGION
  template {
    spec {
      containers {
        image = "gcr.io/${var.GCP_PROJECT_ID}/backend:latest"

        # Environment variables for connecting to the database
        env {
          name  = "DB_HOST"
          value = google_sql_database_instance.main.ip_address[0].ip_address
        }
        env {
          name  = "DB_USER"
          value = var.DB_USER
        }
        env {
          name  = "DB_PASSWORD"
          value = var.DB_PASSWORD
        }
        env {
          name  = "DB_NAME"
          value = var.DB_NAME
        }
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
}
resource "google_cloud_run_service_iam_member" "backend_invoker" {
  service  = google_cloud_run_service.backend.name
  location = google_cloud_run_service.backend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Frontend Service
resource "google_cloud_run_service" "frontend" {
  name     = "frontend"
  location = var.GCP_REGION
  template {
    spec {
      containers {
        image = "gcr.io/${var.GCP_PROJECT_ID}/frontend:latest"

        # Environment variables if needed by your frontend
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
}
resource "google_cloud_run_service_iam_member" "frontend_invoker" {
  service  = google_cloud_run_service.frontend.name
  location = google_cloud_run_service.frontend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
