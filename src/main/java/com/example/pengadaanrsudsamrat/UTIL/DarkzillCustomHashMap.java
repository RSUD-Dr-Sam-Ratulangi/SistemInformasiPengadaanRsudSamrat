package com.example.pengadaanrsudsamrat.UTIL;

import java.util.ArrayList;
import java.util.List;

/**
 * The type Darkzill custom hash map.
 *
 * @param <K> the type parameter
 * @param <V> the type parameter
 */
public class DarkzillCustomHashMap<K, V> {

    private static final int DEFAULT_CAPACITY = 16;
    private static final float DEFAULT_LOAD_FACTOR = 0.75f;

    private Entry<K, V>[] buckets;
    private int size;
    private int capacity;
    private float loadFactor;

    /**
     * Instantiates a new Darkzill custom hash map.
     */
    public DarkzillCustomHashMap() {
        this(DEFAULT_CAPACITY, DEFAULT_LOAD_FACTOR);
    }

    /**
     * Instantiates a new Darkzill custom hash map.
     *
     * @param capacity   the capacity
     * @param loadFactor the load factor
     */
    public DarkzillCustomHashMap(int capacity, float loadFactor) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Entry[capacity];
    }

    /**
     * Put.
     *
     * @param key   the key
     * @param value the value
     */
    public void put(K key, V value) {
        int bucketIndex = getBucketIndex(key);
        Entry<K, V> entry = buckets[bucketIndex];
        while (entry != null) {
            if (entry.key.equals(key)) {
                entry.value = value;
                return;
            }
            entry = entry.next;
        }
        Entry<K, V> newEntry = new Entry<>(key, value);
        newEntry.next = buckets[bucketIndex];
        buckets[bucketIndex] = newEntry;
        size++;
        if (size >= capacity * loadFactor) {
            resize();
        }
    }

    /**
     * Get v.
     *
     * @param key the key
     * @return the v
     */
    public V get(K key) {
        int bucketIndex = getBucketIndex(key);
        Entry<K, V> entry = buckets[bucketIndex];
        while (entry != null) {
            if (entry.key.equals(key)) {
                return entry.value;
            }
            entry = entry.next;
        }
        return null;
    }

    /**
     * Remove v.
     *
     * @param key the key
     * @return the v
     */
    public V remove(K key) {
        int bucketIndex = getBucketIndex(key);
        Entry<K, V> entry = buckets[bucketIndex];
        Entry<K, V> prevEntry = null;
        while (entry != null) {
            if (entry.key.equals(key)) {
                if (prevEntry == null) {
                    buckets[bucketIndex] = entry.next;
                } else {
                    prevEntry.next = entry.next;
                }
                size--;
                return entry.value;
            }
            prevEntry = entry;
            entry = entry.next;
        }
        return null;
    }

    /**
     * Size int.
     *
     * @return the int
     */
    public int size() {
        return size;
    }

    private int getBucketIndex(K key) {
        return Math.abs(key.hashCode() % capacity);
    }

    private void resize() {
        capacity *= 2;
        Entry<K, V>[] newBuckets = new Entry[capacity];
        for (Entry<K, V> entry : buckets) {
            while (entry != null) {
                int bucketIndex = getBucketIndex(entry.key);
                Entry<K, V> newEntry = new Entry<>(entry.key, entry.value);
                newEntry.next = newBuckets[bucketIndex];
                newBuckets[bucketIndex] = newEntry;
                entry = entry.next;
            }
        }
        buckets = newBuckets;
    }

    private static class Entry<K, V> {
        private final K key;
        private V value;
        private Entry<K, V> next;

        /**
         * Instantiates a new Entry.
         *
         * @param key   the key
         * @param value the value
         */
        public Entry(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    /**
     * Update.
     *
     * @param key   the key
     * @param value the value
     */
    public void update(K key, V value) {
        put(key, value);
    }

    /**
     * Clear.
     */
    public void clear() {
        size = 0;
        capacity = DEFAULT_CAPACITY;
        loadFactor = DEFAULT_LOAD_FACTOR;
        buckets = new Entry[capacity];
    }

    /**
     * Values list.
     *
     * @return the list
     */
    public List<V> values() {
        List<V> values = new ArrayList<>();
        for (Entry<K, V> entry : buckets) {
            while (entry != null) {
                values.add(entry.value);
                entry = entry.next;
            }
        }
        return values;
    }
}
