/**
 * Element visual states in viewer. Each element can have different state.
 * Element state can be changed by {@link SceneTools.setElementsState} function in {@link SceneTools} class.
 */
export declare enum ElementState {
    /** Element in its own color and transparency. */
    Normal = 0,
    /** Element is hidden in viewer. */
    Hidden = -1,
    /** Element in its own color and medium transparency with diagonal line pattern. */
    Empty = -2,
    /** Element in white color and extremely transparency. Not selectable. */
    Inactive = -3,
    /** Element in white color and its own transparency. */
    White = 1,
    /** Element in its own color and medium transparency. */
    Transparent = 2
}
