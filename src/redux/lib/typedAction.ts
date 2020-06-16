export default function typedAction<T extends string>(type: T): { type: T };

export default function typedAction<T extends string, P extends any>(
    type: T,
    payload: P
): { type: T; payload: P };

export default function typedAction(type: string, payload?: any) {
    return { type, payload };
}
