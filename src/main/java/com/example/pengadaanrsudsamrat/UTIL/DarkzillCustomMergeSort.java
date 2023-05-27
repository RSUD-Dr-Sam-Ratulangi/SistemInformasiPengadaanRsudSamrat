package com.example.pengadaanrsudsamrat.UTIL;

/**
 * The type Darkzill custom merge sort.
 *
 * @param <T> the type parameter
 */
public class DarkzillCustomMergeSort<T extends Comparable<T>> {
    /**
     * Sort.
     *
     * @param arr the arr
     */
    public void sort(T[] arr) {
        if (arr == null || arr.length < 2) {
            return;
        }
        mergeSort(arr, 0, arr.length - 1);
    }

    private void mergeSort(T[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    private void merge(T[] arr, int left, int mid, int right) {
        T[] temp = (T[]) new Comparable[right - left + 1];
        int i = left;
        int j = mid + 1;
        int k = 0;
        while (i <= mid && j <= right) {
            if (arr[i].compareTo(arr[j]) <= 0) {
                temp[k] = arr[i];
                i++;
            } else {
                temp[k] = arr[j];
                j++;
            }
            k++;
        }
        while (i <= mid) {
            temp[k] = arr[i];
            i++;
            k++;
        }
        while (j <= right) {
            temp[k] = arr[j];
            j++;
            k++;
        }
        for (k = 0; k < temp.length; k++) {
            arr[left + k] = temp[k];
        }
    }
}
