/**
 * 
 */
package ps.shipmentService.services;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ps.shipmentService.model.Shipment;
import ps.shipmentService.service.orchestration.ShipmentService;

/**
 * @author Rami
 *
 */
@RestController
@RequestMapping("/shipmentServiceDetails")
public class ShipmentServiceController {
	
	final static Logger logger = Logger.getLogger(ShipmentServiceController.class);
	
	@Autowired
	private ShipmentService shipmentService;
	
	/**
	 * Get all shipmentService with details
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Shipment>> getAllshipmentServiceWithDetails() {
		logger.info("---------------shipmentService------------");
		List<Shipment> shipmentServiceList = shipmentService.getAllshipmentServiceWithDetails();
		
		return new ResponseEntity<List<Shipment>>(shipmentServiceList, HttpStatus.OK);		
	}
	
	/**
	 * 
	 * @param payment
	 * @param request
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST,  
			consumes = "application/json",
            produces = "application/json")
	public ResponseEntity<Shipment> addShipment(@RequestBody  Shipment shipment, 
			HttpServletRequest request) {
		
		Shipment shipmentRes = shipmentService.addShipment(shipment);
		
		return new ResponseEntity<Shipment>(shipmentRes, HttpStatus.OK);
	}

}
