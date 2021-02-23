import { Rule } from 'antd/lib/form'

export const Required: Rule = {
  required: true,
  message: 'Энэ талбар шаардлагатай!',
}

export const RequiredText: Rule = {
  required: true,
  whitespace: false,
  message: 'Энэ талбар шаардлагатай бөгөөд текст оруулна уу!',
}

export const RequiredNumber: Rule = {
  required: true,
  type: 'number',
  message: 'Энэ талбар шаардлагатай бөгөөд тоо байна!',
}

export const Email: Rule = {
  type: 'email',
  message: 'Энэ талбар имэйл байх ёстой!',
}

export const Phone: Rule = {
  pattern: /^[8-9]{2}[0-9]{6}$/g,
  message: 'Энэ талбар утасны дугаар байх ёстой!',
}
