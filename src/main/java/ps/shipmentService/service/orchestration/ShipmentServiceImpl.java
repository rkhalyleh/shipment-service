/**
 * 
 */
package ps.shipmentService.service.orchestration;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import ps.shipmentService.model.Employee;
import ps.shipmentService.model.Shipment;

/**
 * @author rkhalayl
 *
 */
public class ShipmentServiceImpl implements ShipmentService{

	final static Logger logger = Logger.getLogger(ShipmentServiceImpl.class);

	List<Shipment> shipmentService = new ArrayList<Shipment>();

	@Override
	public List<Shipment> getAllshipmentServiceWithDetails() {
		shipmentService.add(new Shipment("1", "Ramallah", "12/06/2017", new Employee("01", "Ammerr", "Ramallah", "022956325", "test@test.com", "ComCom", "Nothing notes")));
		shipmentService.add(new Shipment("2", "Birzeit", "12/04/2017", new Employee("02", "Mhn", "Ramallah", "022956325", "test@test.com", "ComCom", "Nothing notes")));
		shipmentService.add(new Shipment("3", "Nablus", "12/05/2017", new Employee("03", "Rami", "Ramallah", "022956325", "test@test.com", "ComCom", "Nothing notes")));
		
		return shipmentService;
	}

	@Override
	public Shipment addShipment(Shipment shipment) {
		shipmentService.add(shipment);
		
		return shipment;
	}
}
