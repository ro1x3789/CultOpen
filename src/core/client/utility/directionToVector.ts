import { Vector3 } from '../../shared/interfaces/vector';

export class DirectionVector {
    private position: Vector3;
    private rotation: Vector3;

    constructor(position, rotation) {
        this.position = position;
        this.rotation = rotation;
    }

    eulerToQuaternion(rotation: Vector3) {
        const roll = rotation.x * (Math.PI / 180.0);
        const pitch = rotation.y * (Math.PI / 180.0);
        const yaw = rotation.z * (Math.PI / 180.0);

        const qx =
            Math.sin(roll / 2) * Math.cos(pitch / 2) * Math.cos(yaw / 2) -
            Math.cos(roll / 2) * Math.sin(pitch / 2) * Math.sin(yaw / 2);
        const qy =
            Math.cos(roll / 2) * Math.sin(pitch / 2) * Math.cos(yaw / 2) +
            Math.sin(roll / 2) * Math.cos(pitch / 2) * Math.sin(yaw / 2);
        const qz =
            Math.cos(roll / 2) * Math.cos(pitch / 2) * Math.sin(yaw / 2) -
            Math.sin(roll / 2) * Math.sin(pitch / 2) * Math.cos(yaw / 2);
        const qw =
            Math.cos(roll / 2) * Math.cos(pitch / 2) * Math.cos(yaw / 2) +
            Math.sin(roll / 2) * Math.sin(pitch / 2) * Math.sin(yaw / 2);

        return { x: qx, y: qy, z: qz, w: qw };
    }

    forwardVector(): Vector3 {
        const quatRot = this.eulerToQuaternion(this.rotation);
        const fVectorX = 2 * (quatRot.x * quatRot.y - quatRot.w * quatRot.z);
        const fVectorY = 1 - 2 * (quatRot.x * quatRot.x + quatRot.z * quatRot.z);
        const fVectorZ = 2 * (quatRot.y * quatRot.z + quatRot.w * quatRot.x);

        return { x: fVectorX, y: fVectorY, z: fVectorZ };
    }

    forward(distance: number): Vector3 {
        const forwardVector = this.forwardVector();

        return {
            x: this.position.x + forwardVector.x * distance,
            y: this.position.y + forwardVector.y * distance,
            z: this.position.z + forwardVector.z * distance,
        };
    }

    rightVector() {
        const quatRot = this.eulerToQuaternion(this.rotation);

        const rVectorX = 1 - 2 * (quatRot.y * quatRot.y + quatRot.z * quatRot.z);
        const rVectorY = 2 * (quatRot.x * quatRot.y + quatRot.w * quatRot.z);
        const rVectorZ = 2 * (quatRot.x * quatRot.z - quatRot.w * quatRot.y);

        return { x: rVectorX, y: rVectorY, z: rVectorZ };
    }

    right(distance: number) {
        const rightVector = this.rightVector();

        return {
            x: this.position.x + rightVector.x * distance,
            y: this.position.y + rightVector.y * distance,
            z: this.position.z + rightVector.z * distance,
        };
    }

    upVector() {
        const quatRot = this.eulerToQuaternion(this.rotation);
        const uVectorX = 2 * (quatRot.x * quatRot.z + quatRot.w * quatRot.y);
        const uVectorY = 2 * (quatRot.y * quatRot.z - quatRot.w * quatRot.x);
        const uVectorZ = 1 - 2 * (quatRot.x * quatRot.x + quatRot.y * quatRot.y);

        return { x: uVectorX, y: uVectorY, z: uVectorZ };
    }

    up(distance) {
        const upVector = this.upVector();

        return {
            x: this.position.x + upVector.x * distance,
            y: this.position.y + upVector.y * distance,
            z: this.position.z + upVector.z * distance,
        };
    }
}
