
import { RouterProps } from 'react-router'
import { FormComponentProps } from 'antd/lib/form'

export type AntdFormAndRouterProps = FormComponentProps & RouterProps

export interface IFormItem {
  key: string
  type: string
  reqMessage?: string
  icon?: string
  placeholder?: string
}

export type FormItems = IFormItem[]
