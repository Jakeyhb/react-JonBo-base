export interface FormItemConfig {
    type: 'input' | 'select' | 'cascader';
    label: string;
    name: string;
    options?: { label: string; value: any; children?: any[] }[]; // 用于 select 和 cascader
    validationRule?: any;
    editable?: boolean; // 用于 input
    // 可以根据需求添加更多配置项
}
