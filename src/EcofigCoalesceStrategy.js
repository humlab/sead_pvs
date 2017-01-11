"use strict";

import { EcofigCloneService } from './Ecofig.js';

var __coalesceCounter = 0;

class SimpleEcofigCoalesceStrategy { // alt-names: SiteCoalesceStrategy

    constructor(midPointCalculator) {
        this.midPointCalculator = midPointCalculator;
    }

    coalesce(ecofigs) {
        return ecofigs.reduce((x,y) => this.merge(x,y), null);
    }

    merge(p, q) {

        if (!p || !q) {
            if (!p && !q) {
                throw "SimpleEcofigCoalesceStrategy.merge: null args";
            }
            return (p || q).clone();
        }

        if (p.site !== q.site) {
            throw "SimpleEcofigCoalesceStrategy.merge: site mismatch";
        }

        // Skip cloning of already cloned ecofigs
        let ecofig = p.id > 0 ? p.clone() : p;

        ecofig.id = --__coalesceCounter;
        ecofig.site = p.site === q.site ? p.site : (p.site + '*');
        ecofig.position = this.midPointCalculator.midpoint(p.position, q.position);
        ecofig.epoch = p.epoch || q.epoch;

        q.values.forEach(
            z => {
                let value = ecofig.getValue(z.id);
                if (value) {
                    value.scale += z.scale;
                } else {
                    ecofig.addValue(EcofigCloneService.cloneValue(z));
                }
            }
        );
        ecofig.normalize();
        return ecofig;
    }
}

export { SimpleEcofigCoalesceStrategy };