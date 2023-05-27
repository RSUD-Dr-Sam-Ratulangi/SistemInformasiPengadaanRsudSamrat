import { createRouter, createWebHistory } from 'vue-router';

import { mount } from '@vue/test-utils';
import routerConfig from './routerConfig';

describe('Router Configuration', () => {
    let router;
    let wrapper;

    beforeEach(async () => {
        router = createRouter(routerConfig);
        wrapper = mount({
            template: '<router-view />',
            global: {
                plugins: [router],
            },
        });
        router.push('/');
        await router.isReady();
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should render Homepages component for root path', () => {
        expect(wrapper.text()).toContain('Homepages');
    });

    it('should render Vendorpages component for /vendorInput path', () => {
        router.push('/vendorInput');
        expect(wrapper.text()).toContain('Vendorpages');
    });

    it('should render Productpages component for /product path', () => {
        router.push('/product');
        expect(wrapper.text()).toContain('Productpages');
    });

    it('should render Productviewpage component for /productview path', () => {
        router.push('/productview');
        expect(wrapper.text()).toContain('Productviewpage');
    });

    it('should render Productlistall component for /productlist/:page path with props', () => {
        router.push('/productlist/1');
        expect(wrapper.text()).toContain('Productlistall');
    });

    it('should render VendorList component for /vendorList path', () => {
        router.push('/vendorList');
        expect(wrapper.text()).toContain('VendorList');
    });

    it('should render VendorUpdate component for /VendorUpdate/:id/:name path with name prop', () => {
        router.push('/VendorUpdate/123/TestVendor');
        expect(wrapper.text()).toContain('VendorUpdate');
    });

    it('should render orderDetails component for /orderDetails path', () => {
        router.push('/orderDetails');
        expect(wrapper.text()).toContain('orderDetails');
    });

    it('should render NotFoundPage component for unknown paths', () => {
        router.push('/unknown-path');
        expect(wrapper.text()).toContain('NotFoundPage');
    });
});
