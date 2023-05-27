package com.example.pengadaanrsudsamrat.vendor;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.example.pengadaanrsudsamrat.vendor.VendorModel;
import org.hibernate.proxy.HibernateProxy;

import java.io.IOException;

/**
 * The type Vendor model serializer.
 */
public class VendorModelSerializer extends JsonSerializer<VendorModel> {

    @Override
    public void serialize(VendorModel value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        if (value instanceof HibernateProxy) {
            value = (VendorModel) ((HibernateProxy) value).getHibernateLazyInitializer().getImplementation();
        }
        gen.writeObject(value);
    }
}
