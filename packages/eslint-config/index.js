import base from './base.js';

/** 앱(서비스 코드)용 — UI는 @kqc/ui를 통해서만 사용 (강제 규칙 ①) */
export default [
  ...base,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@mantine/*'],
              message: 'UI는 @kqc/ui에서만 import 합니다 — docs/FRONTEND_GUIDE.md 강제 규칙 ①',
            },
            {
              group: ['@tabler/icons-react'],
              message: '아이콘은 @kqc/ui/icons에서 import 합니다 — docs/FRONTEND_GUIDE.md 강제 규칙 ①',
            },
          ],
        },
      ],
    },
  },
];
