// 表单默认样式
export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    }
};

// 表单默认样式
export const formItemLayoutLg = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        lg: { span: 2 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        lg: { span: 22 }
    }
};

// 行内表单默认样式
export const formInlineItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
};

export const formInlineItemLayoutMax = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};


export const formInlineItemLayoutLayoutMin = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 20
    }
};

export const formInlineItemLayoutLg = {
    labelCol: {
        span: 2
    },
    wrapperCol: {
        span: 20
    }
};

export const formInlineItemLayoutOneline = {
    labelCol: {
        span: 2
    },
    wrapperCol: {
        span: 22
    }
};

export const formInlineItemLayoutTwoColOneline = {
    labelCol: {
        span: 3
    },
    wrapperCol: {
        span: 20
    }
};

export const formInlineItemLayoutCol = {
    sm: { span: 12 },
    lg: { span: 8 }
};

// 按钮样式
export const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    }
};

// 地址前缀
export const pathPrefix = '/client';

// 日期标准格式
export const dateFormat = 'YYYY-MM-DD HH:mm:ss';
export const dateFormatOnlyDate = 'YYYY-MM-DD';
export const dataFormatMinute = 'YYYY-MM-DD HH:mm';

// dom常量
export const $app = document.getElementById('app');

// 统一端口
export const protocol = window.location.protocol;

// 七牛上传配置

// 上传限制
export const uploadSize = 2 * 1024 * 1024; //最大上传文件大小(KB)
// 上传地址
export const uploadUrl = protocol === 'https:' ? 'https://up.qbox.me' : 'http://upload.qiniu.com';

// 简介的最长数据
export const simpleListSize = 3;
