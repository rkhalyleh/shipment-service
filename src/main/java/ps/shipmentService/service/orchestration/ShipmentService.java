/**
 * 
 */
package ps.shipmentService.service.orchestration;

import java.util.List;

import ps.shipmentService.model.Shipment;

/**
 * @author rkhalayl
 *
 */
public interface ShipmentService {

	public List<Shipment> getAllshipmentServiceWithDetails();

	public Shipment addShipment(Shipment shipment);
	
}
