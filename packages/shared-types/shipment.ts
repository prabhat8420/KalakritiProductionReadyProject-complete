export type ShipmentStatus = 'manifested' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed';

export interface ShipmentTrackingEvent {
  id: string;
  shipment_id: string;
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  description?: string;
}

export interface Shipment {
  id: string;
  suborder_id: string;
  tracking_number: string;
  carrier: string;
  status: ShipmentStatus;
  history: ShipmentTrackingEvent[];
}
