import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { ColProps } from 'antd/lib/col';

export interface IFieldDecorator {
  getFieldDecorator<T extends Object = {}>(
    id: keyof T,
    options?: GetFieldDecoratorOptions
  ): (node: React.ReactNode) => React.ReactNode;
}
export interface IFormItemLayout {
  labelCol: ColProps;
  wrapperCol: ColProps;
}
