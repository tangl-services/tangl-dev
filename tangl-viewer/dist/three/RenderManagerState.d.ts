export declare enum RenderManagerStateMode {
    AlwaysOff = 0,
    WhenProgressiveNavigation = 1,
    WhenNavigation = 2,
    AlwaysOn = 3
}
export declare class RenderManagerState {
    progressive: boolean;
    generateCaps: RenderManagerStateMode;
    gtao: RenderManagerStateMode;
    generateIntersectionCaps: boolean;
    capsColor: string;
    intersectedCapsColor: string;
    reducePixelRatio: RenderManagerStateMode;
    antialiasing: RenderManagerStateMode;
}
