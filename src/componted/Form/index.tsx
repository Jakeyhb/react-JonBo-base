import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Row, Col, Cascader, message } from 'antd';
import { FormItemConfig } from './types';

interface Props {
    config: FormItemConfig[];
    onSubmit: (values: any) => void;
}

const CustomForm: React.FC<Props> = ({ config, onSubmit }) => {
    const [form] = Form.useForm();
    const [postalCode, setPostalCode] = useState('');

    useEffect(() => {
        form.setFieldsValue({ postalCode });
    }, [postalCode, form]);

    const handleCascaderChange = (value: string[], selectedOptions: any[]) => {
        // 假设这是从API获取邮编的函数
        const fetchPostalCode = async () => {
            // 这里应该是调用API获取邮编的逻辑
            // 模拟邮编
            return '123456';
        };

        fetchPostalCode().then(code => {
            setPostalCode(code);
            form.setFieldsValue({ postalCode: code });
        });
    };

    const renderFormItem = (item: FormItemConfig) => {
        switch (item.type) {
            case 'input':
                return <Input disabled={!item.editable} />;
            case 'select':
                return (
                    <Select>
                        {item.options?.map(option => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
                    </Select>
                );
            case 'cascader':
                return <Cascader options={item.options} onChange={handleCascaderChange} />;
            default:
                return null;
        }
    };

    return (
        <Form form={form} onFinish={onSubmit} layout="horizontal" onFinishFailed={(errorInfo) => {
            console.error('表单校验失败:', errorInfo);
            message.error('表单填写有误，请检查后再次提交。');
        }}>
            <Row gutter={16}>
                {config.map((item, index) => (
                    <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                            label={item.label}
                            name={item.name}
                            rules={[{ required: true, message: '必填项' }, ...item.validationRule ? [item.validationRule] : []]}
                        >
                            {renderFormItem(item)}
                        </Form.Item>
                    </Col>
                ))}
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ display: 'block', margin: '0 auto' }}>
                    保存
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CustomForm;
