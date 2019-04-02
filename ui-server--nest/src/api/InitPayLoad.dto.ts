export class InitPayloadDto {
    readonly type: 'defaults'|'init-generator'|'custom-scaffold';
    readonly customConfigName?: string;
}
