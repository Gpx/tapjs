//{{HEADER COMMENT START}}
// This file is automatically generated, edits will be lost on rebuild
//{{HEADER COMMENT END}}
import { parseTestArgs, TestBase, } from '@tapjs/core';
//{{PLUGIN IMPORT START}}
import * as Plugin_after from "@tapjs/after";
import * as Plugin_afterEach from "@tapjs/after-each";
import * as Plugin_asserts from "@tapjs/asserts";
import * as Plugin_before from "@tapjs/before";
import * as Plugin_beforeEach from "@tapjs/before-each";
import * as Plugin_filter from "@tapjs/filter";
import * as Plugin_fixture from "@tapjs/fixture";
import * as Plugin_intercept from "@tapjs/intercept";
import * as Plugin_mock from "@tapjs/mock";
import * as Plugin_snapshot from "@tapjs/snapshot";
import * as Plugin_spawn from "@tapjs/spawn";
import * as Plugin_stdin from "@tapjs/stdin";
import * as Plugin_typescript from "@tapjs/typescript";
import * as Plugin_worker from "@tapjs/worker";
import { isConfigOption } from 'jackspeak';
import { inspect } from 'node:util';
const kInspect = Symbol.for('nodejs.util.inspect.custom');
const copyInspect = (v) => ({
    [kInspect]: (...args) => inspect(v, ...args),
});
const copyToString = (v) => ({
    toString: Object.assign(() => v.toString(), {
        toString: () => 'function toString() { [native code] }',
    }),
});
const copyFunction = (t, plug, v) => {
    const f = function (...args) {
        const thisArg = this === t ? plug : this;
        const ret = v.apply(thisArg, args);
        // If a plugin method returns 'this', and it's the plugin,
        // then we return the extended Test instead.
        return ret === thisArg && thisArg === plug ? t : ret;
    };
    const vv = Object.assign(Object.assign(f, v), copyToString(v), copyInspect(v));
    const nameProp = Reflect.getOwnPropertyDescriptor(v, 'name');
    if (nameProp) {
        Reflect.defineProperty(f, 'name', nameProp);
    }
    return vv;
};
let plugins_;
//{{PLUGINS CODE START}}
// const plugins = () => {
//   if (plugins_) return plugins_
//   return (plugins_ = [])
// }
// type PluginSet = (TapPlugin<any> | TapPlugin<any, TestBaseOpts>)[]
const plugins = () => {
    if (plugins_)
        return plugins_;
    return (plugins_ = [
        Plugin_after.plugin,
        Plugin_afterEach.plugin,
        Plugin_asserts.plugin,
        Plugin_before.plugin,
        Plugin_beforeEach.plugin,
        Plugin_filter.plugin,
        Plugin_fixture.plugin,
        Plugin_intercept.plugin,
        Plugin_mock.plugin,
        Plugin_snapshot.plugin,
        Plugin_spawn.plugin,
        Plugin_stdin.plugin,
        Plugin_typescript.plugin,
        Plugin_worker.plugin,
    ]);
};
//{{PLUGINS CODE END}}
//{{PLUGINS CONFIG START}}
// // just referenced to keep prettier/tslint happy
// /* c8 ignore start */
// isConfigOption
// const c = <T extends ConfigSet>(j: Jack<T>) => j
// c
// /* c8 ignore stop */
export const config = (jack) => {
    const config_Plugin_filter_0 = Plugin_filter.config["only"];
    if (!isConfigOption(config_Plugin_filter_0, "boolean", false)) {
        throw new Error("Invalid config option 'only' defined in plugin: '@tapjs/filter'");
    }
    const config_Plugin_filter_1 = Plugin_filter.config["grep"];
    if (!isConfigOption(config_Plugin_filter_1, "string", true)) {
        throw new Error("Invalid config option 'grep' defined in plugin: '@tapjs/filter'");
    }
    const config_Plugin_filter_2 = Plugin_filter.config["invert"];
    if (!isConfigOption(config_Plugin_filter_2, "boolean", false)) {
        throw new Error("Invalid config option 'invert' defined in plugin: '@tapjs/filter'");
    }
    const config_Plugin_filter_3 = Plugin_filter.config["no-invert"];
    if (!isConfigOption(config_Plugin_filter_3, "boolean", false)) {
        throw new Error("Invalid config option 'no-invert' defined in plugin: '@tapjs/filter'");
    }
    const config_Plugin_fixture_0 = Plugin_fixture.config["save-fixture"];
    if (!isConfigOption(config_Plugin_fixture_0, "boolean", false)) {
        throw new Error("Invalid config option 'save-fixture' defined in plugin: '@tapjs/fixture'");
    }
    const config_Plugin_snapshot_0 = Plugin_snapshot.config["snapshot"];
    if (!isConfigOption(config_Plugin_snapshot_0, "boolean", false)) {
        throw new Error("Invalid config option 'snapshot' defined in plugin: '@tapjs/snapshot'");
    }
    const config_Plugin_typescript_0 = Plugin_typescript.config["typecheck"];
    if (!isConfigOption(config_Plugin_typescript_0, "boolean", false)) {
        throw new Error("Invalid config option 'typecheck' defined in plugin: '@tapjs/typescript'");
    }
    return jack
        .heading("From plugin: @tapjs/filter")
        .flag({ "only": config_Plugin_filter_0 })
        .optList({ "grep": config_Plugin_filter_1 })
        .flag({ "invert": config_Plugin_filter_2 })
        .flag({ "no-invert": config_Plugin_filter_3 })
        .heading("From plugin: @tapjs/fixture")
        .flag({ "save-fixture": config_Plugin_fixture_0 })
        .heading("From plugin: @tapjs/snapshot")
        .flag({ "snapshot": config_Plugin_snapshot_0 })
        .heading("From plugin: @tapjs/typescript")
        .flag({ "typecheck": config_Plugin_typescript_0 });
};
//{{PLUGINS CONFIG END}}
//{{LOADERS START}}
// export const loaders = []
const preloaders = new Set([
    "ts-node/esm"
]);
export const loaders = [
    "@tapjs/mock/loader",
    "ts-node/esm"
].sort((a, b) => preloaders.has(a) ? -1 : preloaders.has(b) ? 1 : 0);
//{{LOADERS END}}
//{{PLUGIN SIGNATURE START}}
// export const signature = ''
export const signature = `@tapjs/after
@tapjs/after-each
@tapjs/asserts
@tapjs/before
@tapjs/before-each
@tapjs/filter
@tapjs/fixture
@tapjs/intercept
@tapjs/mock
@tapjs/snapshot
@tapjs/spawn
@tapjs/stdin
@tapjs/typescript
@tapjs/worker`;
const applyPlugins = (base, plugs = plugins()) => {
    const ext = plugs
        // typecast in case we have *only* option-less plugins.
        .map(p => p(base, base.options))
        .concat(base);
    const getCache = new Map();
    // extend the proxy with Object.create, and then set the toStringTag
    // to 'Test', so we don't get stack frames like `Proxy.<anonymous>`
    const t = Object.create(new Proxy(base, {
        has(_, p) {
            for (const t of ext) {
                if (Reflect.has(t, p))
                    return true;
            }
            return false;
        },
        ownKeys() {
            const k = [];
            for (const t of ext) {
                const keys = Reflect.ownKeys(t);
                k.push(...keys);
            }
            return [...new Set(k)];
        },
        set(_, p, v) {
            // check to see if there's any setters, and if so, set it there
            // otherwise, just set on the base
            let didSet = false;
            if (getCache.has(p))
                getCache.delete(p);
            for (const t of ext) {
                let o = t;
                while (o) {
                    // assign to the all plugs that can receive it
                    const prop = Reflect.getOwnPropertyDescriptor(o, p);
                    if (prop) {
                        if (prop.set || prop.writable) {
                            //@ts-ignore
                            t[p] = v;
                            didSet = true;
                        }
                        break;
                    }
                    o = Reflect.getPrototypeOf(o);
                }
            }
            if (!didSet) {
                // if nothing has that field, assign to the base
                //@ts-ignore
                base[p] = v;
            }
            return true;
        },
        get(_, p) {
            if (p === 'parent') {
                return base.parent?.t;
            }
            // cache get results so t.blah === t.blah
            // we only cache functions, so that getters aren't memoized
            // Of course, a getter that returns a function will be broken,
            // at least when accessed from outside the plugin, but that's
            // a pretty narrow caveat, and easily documented.
            if (getCache.has(p))
                return getCache.get(p);
            for (const plug of ext) {
                if (p in plug) {
                    //@ts-ignore
                    const v = plug[p];
                    // Functions need special handling so that they report
                    // the correct toString and are called on the correct object
                    // Otherwise attempting to access #private props will fail.
                    if (typeof v === 'function') {
                        const vv = copyFunction(t, plug, v);
                        getCache.set(p, vv);
                        return vv;
                    }
                    else {
                        return v;
                    }
                }
            }
        },
    }));
    Object.defineProperty(t, Symbol.toStringTag, {
        value: 'Test',
    });
    // assign a reference to the extended Test for use in plugin at run-time
    Object.assign(base, { t });
    // put the .t self-ref and plugin inspection on top of the stack
    ext.unshift({
        t,
        get pluginLoaded() {
            return (plugin) => {
                return plugs.includes(plugin);
            };
        },
        get plugins() {
            return [...plugs];
        },
    });
    return t;
};
const kPluginSet = Symbol('@tapjs/test construction plugin set');
const kClass = Symbol('@tapjs/test construction class');
export class Test extends TestBase {
    #Class;
    #pluginSet;
    constructor(opts, __INTERNAL = {
        [kPluginSet]: plugins(),
        [kClass]: Test,
    }) {
        super(opts);
        this.#Class = __INTERNAL[kClass];
        const pluginSet = __INTERNAL[kPluginSet];
        this.#pluginSet = pluginSet;
        // need to ignore this because it's a ctor that returns a value.
        /* c8 ignore start */
        return applyPlugins(this, pluginSet);
    }
    /* c8 ignore stop */
    /* c8 ignore start */
    get [Symbol.toStringTag]() {
        return 'Test';
    }
    /* c8 ignore stop */
    applyPlugin(plugin) {
        if (this.printedOutput) {
            throw new Error('Plugins must be applied prior to any test output');
        }
        if (this.#pluginSet.includes(plugin)) {
            throw new Error('Plugin already applied');
        }
        const p = plugin;
        const pluginSetExtended = this.#pluginSet.concat([p]);
        const extended = this;
        class TestExtended extends Test {
            constructor(opts, __INTERNAL = {
                [kPluginSet]: pluginSetExtended,
                [kClass]: TestExtended,
            }) {
                super(opts, __INTERNAL);
            }
        }
        extended.#pluginSet = pluginSetExtended;
        extended.#Class = TestExtended;
        return applyPlugins(extended, pluginSetExtended);
    }
    // actually no way to get at this, since we always call applyPlugins in the
    // Test constructor, so there's always *something* here, but it nevertheless
    // seems sensible to have some stubs in place. At least, they are relevant
    // for establishing the typed interface.
    pluginLoaded(plugin) {
        plugin;
        return false;
    }
    get plugins() {
        return [];
    }
    test(...args) {
        const extra = parseTestArgs(...args);
        return this.sub(this.#Class, extra, this.test);
    }
    todo(...args) {
        const extra = parseTestArgs(...args);
        extra.todo = true;
        return this.sub(this.#Class, extra, this.todo);
    }
    skip(...args) {
        const extra = parseTestArgs(...args);
        extra.skip = true;
        return this.sub(this.#Class, extra, this.skip);
    }
}
//# sourceMappingURL=index.js.map