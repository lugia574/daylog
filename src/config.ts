// src/config.ts

// 1. window 객체에 runtimeConfig가 있을 수 있다고 타입스크립트에게 알려줍니다.
//    (타입 확장을 통해)
declare global {
    interface Window {
        runtimeConfig?: {
            VITE_API_URL: string;
        };
    }
}

// 2. 설정 값을 담을 객체 인터페이스를 정의합니다.
interface AppConfig {
    apiUrl: string;
}

// 3. window에 있는 설정 값을 읽어와서 우리 앱 전용 설정 객체로 만듭니다.
//    만약 window.runtimeConfig가 없으면 빈 객체를 기본값으로 사용해 오류를 방지합니다.
const config: AppConfig = {
    apiUrl: window.runtimeConfig?.VITE_API_URL || '',
};

// 4. 다른 파일에서 import해서 쓸 수 있도록 export 해줍니다.
export default config;
