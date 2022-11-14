export declare class ProgressBar {
    private readonly viewerElement;
    private readonly progressElement;
    constructor(viewerElement: HTMLElement);
    setProgress(loaded: number): void;
}
