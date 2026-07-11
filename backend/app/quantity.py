class QuantityEstimator:
    def estimate(self,detections, image_width,image_height):
        total_area = image_width * image_height
        garbage_area = 0

        for detection in detections:

            x1,y1,x2,y2 = detection["bbox"]

            width = x2 - x1
            height = y2 - y1

            garbage_area += (width * height)

        coverage = (garbage_area / total_area) * 100
        print(coverage)

        return {
            "garbage_count" : (len(detections)),
            "coverage" : round(coverage,2)
        }


    