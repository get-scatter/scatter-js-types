/** @see https://get-scatter.github.io/docs/api-reference */
declare module '@scatterjs/core' {
    import type { Api, JsonRpc } from "eosjs";
    import type ScatterEOS from "@scatterjs/eosjs2";

    /** @see https://get-scatter.github.io/docs/networks */
    interface Network {
        blockchain: "eth" | "eos" | "trx";
        host: "127.0.0.1" | "localhost" | "nodes.get-scatter.com" | string;
        port: 80 | 443 | number | string;
        protocol: "http" | "https" | string;
        chainId: "1" | "acab4m20dlsdl3DlsSo3" | string; // ''
    }

    /** @see https://get-scatter.github.io/docs/api-link-account */
    interface EosAccount {
        name: string; // 'helloworld'
        authority: string; // 'active'
        publicKey: string; // 'EOS...'
    }

    /** @see https://get-scatter.github.io/docs/requirable-fields */
    type RequiredFields = {
        accounts?: Network[];
        personal?: ("firstname" | "lastname" | "email" | "birthdate")[];
        location?: ("phone" | "address" | "city" | "state" | "country" | "zipcode")[];
    };

    /** @see https://get-scatter.github.io/docs/identities */
    interface Identity {
        name: string;
        /** Scatter's internal authentication property, not blockchain's public key */
        publicKey: string;
        /** user ID in Scatter */
        hash: string;
        kyc: false | unknown;
        ridl: -1 | string;
        accounts?: EosAccount[];
        personal?: {
            firstname?: string; // 'Clark'
            lastname?: string; // 'Kent'
            email?: string; // 'superheroes@anonymous.com'
            birthdate?: string; // '29-3-1938'
        };
        location?: {
            phone?: string; // '555-5555'
            address?: string; // '1938 Sullivan Lane'
            city?: string; // 'Nowhere'
            state?: string; // 'OK'
            country?: {
                code: string; // 'US'
                name: string; // 'United States'
            };
            zipcode?: string; // '73038'
        };
    }

    interface Scatter {
        connect(applicationName: string): Promise<boolean>;
        /** @see https://get-scatter.github.io/docs/api-request-arbitrary-signature */
        getArbitrarySignature(publicKey: string, data: string, _2: unknown, _3: unknown): Promise<string>;
        getIdentity(requiredFields: RequiredFields): Promise<void>;
        /** @see https://get-scatter.github.io/docs/api-forget-identity */
        forgetIdentity(): void;
        /** @see https://get-scatter.github.io/docs/signature-providers */
        eos(network: Network, eosjsApi: typeof Api, options: { rpc: JsonRpc }): unknown;
        eth(network: Network, web3: unknown): unknown;
        trx(network: Network, tronWeb: unknown): unknown;
        identity: Identity | null;
    }

    export const plugins: (scatterEos: ScatterEOS) => void;
    export const scatter: Scatter;
}
