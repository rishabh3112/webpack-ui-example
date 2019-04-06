export class InitPayloadDto {
    readonly type: 'defaults'|'init-generator'|'custom-scaffold';
    readonly customConfigName?: string;
}

// tslint:disable-next-line: max-classes-per-file
export class SavePayloadDto {
    readonly webpack: string;
}
