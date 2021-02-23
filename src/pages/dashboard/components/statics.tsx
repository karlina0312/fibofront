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
  { title: 'Хорогдуулсан өртөг', value: 'AMORTIZED_COST', key: 'AmortizedCost' },
  { title: 'Холимог зардал', value: 'BLENDED_COST', key: 'BlendedCost' },
  { title: 'Дундаж өртөг', value: 'NORMALIZED_USAGE_AMOUNT', key: 'NormalizedUsageAmount' },
  { title: 'Зардал', value: 'UNBLENDED_COST', key: 'UnblendedCost' },
  { title: 'Хэрэглээний хэмжээ', value: 'USAGE_QUANTITY', key: 'UsageQuantity' },
]

export type granularityType = 'DAILY' | 'MONTHLY'
export const granularityValues = [
  { title: 'Өдөр тутмын', value: 'DAILY' },
  { title: 'Түүх', value: 'MONTHLY' },
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
  { title: 'Ашигдаж буй бүсчлэл', value: 'AZ' },
  { title: 'Инстансын төрөл', value: 'INSTANCE_TYPE' },
  { title: 'Худалдан авалтын төрөл', value: 'PURCHASE_TYPE' },
  { title: 'Үйлчилгээ', value: 'SERVICE' },
  { title: 'Платформ', value: 'PLATFORM' },
  { title: 'Түрээс', value: 'TENANCY' },
  { title: 'Бичлэгийн төрөл', value: 'RECORD_TYPE' },
  { title: 'Хуулийн этгээдийн нэр ', value: 'LEGAL_ENTITY_NAME' },
  { title: 'Байршуулах сонголт ', value: 'DEPLOYMENT_OPTION' },
  { title: 'Өгөгдлийн сангийн төрөл', value: 'DATABASE_ENGINE' },
  { title: 'Кейч энжин', value: 'CACHE_ENGINE' },
  { title: 'Инстанс төрлүүд', value: 'INSTANCE_TYPE_FAMILY' },
  { title: 'Бүсчлэл', value: 'REGION' },
  { title: 'Тооцооны нэгж ', value: 'BILLING_ENTITY' },
  { title: 'Захиалагын ID', value: 'RESERVATION_ID' },
  { title: 'Төлөвлөгөө төрлөөр хадгалах ', value: 'SAVINGS_PLANS_TYPE' },
  { title: 'ARN төлөвөөр хадгалах', value: 'SAVINGS_PLAN_ARN' },
  { title: 'Үйлдэлийн систем', value: 'OPERATING_SYSTEM' },
]
