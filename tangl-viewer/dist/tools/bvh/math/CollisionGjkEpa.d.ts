import * as THREE from "three";
/**
 *
 */
declare class Information {
    readonly distance: number;
    readonly index: number;
    readonly normal: THREE.Vector3 | undefined;
    constructor(distance: number, index: number, normal?: THREE.Vector3);
}
/**
 * Algorythm GJK, EPA.
 */
export declare class CollisionGjkEpa {
    private readonly EPSILON;
    constructor();
    /**
     * Method to get a normal of 3 points in 2D and 3D.
     *
     * @method getNormal
     * @private
     * @param {THREE.Vector3} a
     * @param {THREE.Vector3} b
     * @param {THREE.Vector3} c
     * @return {THREE.Vector3} The normal.
     */
    getNormal(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3): THREE.Vector3;
    /**
     * Gets the barycenter of a cloud points.
     *
     * @method getBarycenter
     * @private
     * @param {THREE.Vector3[]} vertices the cloud points
     * @return {THREE.Vector3} The barycenter.
     */
    getBarycenter(vertices: Array<THREE.Vector3>): THREE.Vector3;
    /**
     * The support function.
     *
     * @method support
     * @param {THREE.Vector3[]} colliderPoints The convexe collider object.
     * @param {THREE.Vector3[]} collidedPoints The convexe collided object.
     * @param {THREE.Vector3} direction The direction.
     * @return {THREE.Vector3} The support points.
     */
    support(colliderPoints: THREE.Vector3[], collidedPoints: THREE.Vector3[], direction: THREE.Vector3): THREE.Vector3;
    /**
     * Gets the farthest point of a cloud points.
     *
     * @method getFarthestPointInDirection
     * @private
     * @param {THREE.Vector3[]} vertices the cloud points.
     * @param {THREE.Vector3} direction The direction to search.
     * @return {THREE.Vector3} The barycenter.
     */
    getFarthestPointInDirection(vectors: THREE.Vector3[], direction: THREE.Vector3): THREE.Vector3;
    /**
     * Checks if the origin is in a line.
     *
     * @method containsLine
     * @private
     * @param {THREE.Vector3[]} simplex The simplex.
     * @param {THREE.Vector3} direction The direction.
     * @return {Boolean} False in any case because the algorithm just begin.
     */
    containsLine(simplex: THREE.Vector3[], direction: THREE.Vector3): boolean;
    /**
     * Checks if the origin is in a triangle.
     *
     * @method containsTriangle
     * @private
     * @param {THREE.Vector3[]} simplex The simplex.
     * @param {THREE.Vector3} direction The direction.
     * @return {Boolean} If in 2D case, may return true if the origin is in the triangle.
     */
    containsTriangle(simplex: THREE.Vector3[], direction: THREE.Vector3): boolean | undefined;
    /**
     * Checks if the origin is in a tetrahedron.
     *
     * @method containsTetrahedron
     * @private
     * @param {THREE.Vector3[]} simplex The simplex.
     * @param {THREE.Vector3} dir The direction.
     * @return {Boolean} Return true if the origin is in the tetrahedron.
     */
    containsTetrahedron(simplex: THREE.Vector3[], direction: THREE.Vector3): boolean | undefined;
    /**
     * checkTwoTetrahedron
     * @param ao
     * @param ab
     * @param ac
     * @param abc
     * @param direction
     * @param simplex
     * @returns
     */
    checkTwoTetrahedron(ao: THREE.Vector3, ab: THREE.Vector3, ac: THREE.Vector3, abc: THREE.Vector3, direction: THREE.Vector3, simplex: THREE.Vector3[]): boolean | undefined;
    /**
     * checkTetrahedron
     * @param ao
     * @param ab
     * @param ac
     * @param abc
     * @param direction
     * @param simplex
     * @returns
     */
    checkTetrahedron(ao: THREE.Vector3, ab: THREE.Vector3, ac: THREE.Vector3, abc: THREE.Vector3, direction: THREE.Vector3, simplex: THREE.Vector3[]): boolean;
    /**
  * Checks if the simplex contains the origin.
  *
  * @method containsOrigin
  * @param {THREE.Vector3[]} simplex simplex or false if no intersection.
  * @param {THREE.Vector3} direction The direction to test.
  * @return {Boolean} Contains or not.
  */
    containsOrigin(simplex: THREE.Vector3[], direction: THREE.Vector3): boolean | undefined;
    /**
     *
     * @param colliderPoints
     * @param collidedPoints
     * @returns
     */
    minkowsky(colliderPoints: Array<THREE.Vector3>, collidedPoints: Array<THREE.Vector3>): THREE.Vector3[];
    /**
     * The GJK (Gilbert–Johnson–Keerthi) algorithm.
     * Computes support points to build the Minkowsky difference and
     * create a simplex. The points of the collider and the collided object
     * must be convexe.
     *
     * @method findResponseWithEdge
     * @param {THREE.Vector3[]} colliderPoints The convexe collider object.
     * @param {THREE.Vector3[]} collidedPoints The convexe collided object.
     * @return {THREE.Vector3[]} The simplex or false if no intersection.
     */
    check(colliderPoints: Array<THREE.Vector3>, collidedPoints: Array<THREE.Vector3>): false | THREE.Vector3[] | undefined;
    /**
     * Gets the nearest edge of the simplex.
     *
     * @method getNearestEdge
     * @private
     * @param {THREE.Vector3[]} simplex The simplex.
     * @return {Information} Informations about the nearest edge (distance, index and normal).
     */
    getNearestEdge(simplex: THREE.Vector3[]): Information;
    /**
     * Gets the nearest Triangle of the polytope.
     *
     * @method getNearestTriangle
     * @private
     * @param { Triangle[] } polytope The polytope.
     * @return { Information } Informations about the nearest edge (distance and index).
     */
    getNearestTriangle(polytope: THREE.Triangle[]): Information;
    /**
     * Adds adge to the list and checks if the edge if not in.
     *
     * @method addEdge
     * @private
     * @param {Object[]} edges The edges.
     * @param {Object} dir The edge to check.
     */
    addEdge(edges: any, edge: any): void;
    /**
     * Finds the response with the simplex (edges) of the gjk algorithm.
     *
     * @method findResponseWithEdge
     * @param {THREE.Vector3[]} colliderPoints The convexe collider object.
     * @param {THREE.Vector3[]} collidedPoints The convexe collided object.
     * @param {THREE.Vector3[]} simplex The simplex.
     * @return {THREE.Vector3|THREE.Vector3} The penetration vector.
     */
    findResponseWithEdge(colliderPoints: THREE.Vector3[], collidedPoints: THREE.Vector3[], simplex: THREE.Vector3[]): THREE.Vector3 | boolean;
    /**
     * Finds the response with the polytope done with the simplex of the gjk algorithm.
     *
     * @method findResponseWithTriangle
     * @param {THREE.Vector3[]} colliderPoints The convexe collider object.
     * @param {THREE.Vector3[]} collidedPoints The convexe collided object.
     * @param {Triangle[]} polytope The polytope done with the simplex.
     * @return {THREE.Vector3} The penetration vector.
     */
    findResponseWithTriangle(colliderPoints: THREE.Vector3[], collidedPoints: THREE.Vector3[], polytope: any): THREE.Vector3 | boolean;
    /**
     * Gets the response of the penetration vector with the simplex.
     *
     * @method getResponse
     * @param {THREE.Vector3[]} colliderPoints The convexe collider object.
     * @param {THREE.Vector3[]} collidedPoints The convexe collided object.
     * @param {THREE.Vector3[]} simplex The simplex of the Minkowsky difference.
     * @return {THREE.Vector3} The penetration vector.
     */
    getResponse(colliderPoints: THREE.Vector3[], collidedPoints: THREE.Vector3[], simplex: THREE.Vector3[]): THREE.Vector3 | boolean;
    /**
     * Checks if the collider and the collided object are intersecting.
     *
     * @method isIntersecting
     * @param {THREE.Vector3[]} colliderPoints The convexe collider object.
     * @param {THREE.Vector3[]} collidedPoints The convexe collided object.
     * @return {Boolean} Is intersecting or not.
     */
    isIntersecting(colliderPoints: THREE.Vector3[], collidedPoints: THREE.Vector3[]): boolean;
    /**
     * Checks if the collider and the collided object are intersecting
     * and give the response to be out of the object.
     *
     * @method intersect
     * @param {THREE.Vector3[]} colliderPoints The convexe collider object.
     * @param {THREE.Vector3[]} collidedPoints The convexe collided object.
     * @return {THREE.Vector3} The penetration vector.
     */
    intersect(colliderPoints: THREE.Vector3[], collidedPoints: THREE.Vector3[]): THREE.Vector3 | boolean;
}
export {};
