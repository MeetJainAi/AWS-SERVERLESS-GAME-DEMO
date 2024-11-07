declare module 'confetti-js' {
    interface ConfettiSettings {
      target?: string;
      max?: number;
      size?: number;
      animate?: boolean;
      respawn?: boolean;
      clock?: number;
      props?: string[];
      colors?: string[][];
      start_from_edge?: boolean;
      width?: number;
      height?: number;
      rotate?: boolean;
    }
  
    export default class ConfettiGenerator {
      constructor(settings: ConfettiSettings);
      render(): void;
      clear(): void;
    }
  }
  