/**
 * Event for mouse moving on renderer area.
 */
export declare class MoveEvent extends MouseEvent {
    constructor(event: MouseEvent);
}
/**
 * Render events collection. Events raised by {@link RenderManager}.
 */
export declare enum RenderEvents {
    /**Raised when active controller extension starts camera navigation. */
    NavStart = "navstart",
    /**Raised when active controller extension ends camera navigation. */
    NavEnd = "navend",
    /**Raised when active controller extension makes any changes in camera state (position, rotation and so on).  */
    NavChange = "navchange",
    BeforeNavChange = "beforenavchange",
    /**Raised when user clicks on renderer area.  */
    Click = "click",
    /**Raised when user clicks twice on renderer area.  */
    DblClick = "dblclick",
    /**Raised when user press down mouse button or touches on display or screen area.  */
    Down = "down",
    /**Raised when user releases mouse button or releases finger from display or screen area.  */
    Up = "up",
    /**Raised when user moves mouse or pointer on renderer area. Event uses {@link MoveEvent} signature. */
    Move = "move",
    /**Raised when user moves mouse wheel.  */
    Wheel = "wheel",
    /**Raised when mouse hovers element in scene.  */
    Hover = "hover"
}
export declare class RenderEventsFactory {
    static navstart: Event;
    static navend: Event;
    static navchange: Event;
    static beforeNavChange: Event;
    static click: Event;
    static dblclick: Event;
    static down: Event;
    static up: Event;
    static move: typeof MoveEvent;
    static wheel: Event;
    static hover: Event;
}
