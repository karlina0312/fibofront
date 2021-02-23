export const colors = [
  '#FF6E61',
  '#2DB1A1',
  '#6A45CE',
  '#FED918',
  '#A51E54',
  '#3ECC54',
  '#2BB2BB',
  '#111D5E',
  '#FB7813',
  '#E8E4E1',
]

export type metricType =
  | 'AMORTIZED_COST'
  | 'BLENDED_COST'
  | 'NORMALIZED_USAGE_AMOUNT'
  | 'UNBLENDED_COST'
  | 'USAGE_QUANTITY'
export const metricsValues = [
  { title: 'Amortized cost', value: 'AMORTIZED_COST', key: 'AmortizedCost' },
  { title: 'Blended cost', value: 'BLENDED_COST', key: 'BlendedCost' },
  { title: 'Normalized usage amount', value: 'NORMALIZED_USAGE_AMOUNT', key: 'NormalizedUsageAmount' },
  { title: 'Unblended cost', value: 'UNBLENDED_COST', key: 'UnblendedCost' },
  { title: 'Usage quantity', value: 'USAGE_QUANTITY', key: 'UsageQuantity' },
]

export type granularityType = 'DAILY' | 'MONTHLY'
export const granularityValues = [
  { title: 'Daily', value: 'DAILY' },
  { title: 'Monthly', value: 'MONTHLY' },
]

export const serviceValues = [
  'AWS Amplify',
  'AWS AppSync',
  'AWS Data Transfer',
  'AWS Elemental MediaStore',
  'AWS Key Management Service',
  'AWS Lambda',
  'AWS Secrets Manager',
  'Amazon API Gateway',
  'Amazon CloudFront',
  'Amazon Cognito',
  'Amazon DynamoDB',
  'Amazon EC2 Container Registry (ECR)',
  'EC2 - Other',
  'Amazon Elastic Compute Cloud - Compute',
  'Amazon Elasticsearch Service',
  'Amazon Glacier',
  'Amazon Lex',
  'Amazon Lightsail',
  'Amazon Rekognition',
  'Amazon Relational Database Service',
  'Amazon Route 53',
  'Amazon Simple Email Service',
  'Amazon Simple Notification Service',
  'Amazon Simple Queue Service',
  'Amazon Simple Storage Service',
  'AmazonCloudWatch',
]

export const groupValues = [
  { title: 'Availability zone', value: 'AZ' },
  { title: 'Instance type', value: 'INSTANCE_TYPE' },
  { title: 'Purchase type', value: 'PURCHASE_TYPE' },
  { title: 'Service', value: 'SERVICE' },
  { title: 'Platform', value: 'PLATFORM' },
  { title: 'Tenancy', value: 'TENANCY' },
  { title: 'Record type', value: 'RECORD_TYPE' },
  { title: 'Legal entity name', value: 'LEGAL_ENTITY_NAME' },
  { title: 'Deployment option', value: 'DEPLOYMENT_OPTION' },
  { title: 'Database engine', value: 'DATABASE_ENGINE' },
  { title: 'Cache engine', value: 'CACHE_ENGINE' },
  { title: 'Instance type family', value: 'INSTANCE_TYPE_FAMILY' },
  { title: 'Region', value: 'REGION' },
  { title: 'Billing entity', value: 'BILLING_ENTITY' },
  { title: 'Reservation ID', value: 'RESERVATION_ID' },
  { title: 'Savings plans type', value: 'SAVINGS_PLANS_TYPE' },
  { title: 'Savings plan ARN', value: 'SAVINGS_PLAN_ARN' },
  { title: 'Operating system', value: 'OPERATING_SYSTEM' },
]
